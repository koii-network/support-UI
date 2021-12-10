import React, { useEffect, useState } from "react";

import Sidebar from "../sidebar";

const chunkSizeLimit = 100;
let chunkCount = 0;

function fetchNFTChunk(cursor) {
  const cursorMarker = "[[cursor]]";
  const queryBase = `query {transactions(first: 100, ${cursorMarker} tags: {name: "Action", values: ["marketplace/Create"]}) {edges {cursor node {data {size}}}}}`;
  let query;
  if (cursor) {
    query = queryBase.replace(cursorMarker, `after: "${cursor}",`);
  } else {
    query = queryBase.replace(cursorMarker, ``);
  }

  return fetch("https://arweave.net/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
    }),
  })
    .then((res) => res.json())
    .then(({ data }) => data);
}

function getChunkDataSize(data) {
  return data.transactions.edges.reduce(
    (sum, { node }) => sum + +node.data.size,
    0
  );
}

function getChunkLastCursor(data) {
  const edges = data.transactions.edges;
  return edges[edges.length - 1].cursor;
}

function isMaxChunkSize(data) {
  return data.transactions.edges.length === chunkSizeLimit;
}

function checkAndFetchNextChunk(data, alreadyFetchedDataSize = 0) {
  const alreadyFetchedDataSizeWithCurrChunk =
    getChunkDataSize(data) + alreadyFetchedDataSize;
  if (isMaxChunkSize(data)) {
    chunkCount++;
    return fetchNFTChunk(getChunkLastCursor(data)).then((newData) =>
      checkAndFetchNextChunk(newData, alreadyFetchedDataSizeWithCurrChunk)
    );
  }
  return Promise.resolve(alreadyFetchedDataSizeWithCurrChunk);
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const refreshIntervalValue = 5000;

export default function KoiiStats() {
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [fetchInterval, setFetchInterval] = useState(undefined);

  useEffect(() => {
    setFetchInterval(
      setInterval(() => {
        setFetchTrigger(!fetchTrigger);
      }, refreshIntervalValue)
    );
    return () => clearInterval(fetchInterval);
  }, []);

  const [mainNetStatsState, setMainNetStatsState] = useState({
    wallets: 0,
    nftViews: 0,
    koiiTransacted: 0,
  });

  useEffect(() => {
    fetch("https://mainnet.koii.live/state")
      .then((res) => res.json())
      .then((data) => {
        setMainNetStatsState({
          wallets: Object.keys(data.balances).length,
          koiiTransacted: Object.values(data.balances).reduce(
            (sum, curr) => sum + curr,
            0
          ),
        });
      });
  }, [fetchTrigger]);

  const [attentionStatsState, setAttentionStatsState] = useState({
    nftCount: 0,
    nftViews: 0,
  });

  useEffect(() => {
    fetch("https://mainnet.koii.live/attention")
      .then((res) => res.json())
      .then((data) => {
        setAttentionStatsState({
          nftCount: Object.keys(data.nfts).length,
          nftViews: data.task.attentionReport.reduce(
            (sum, rep) =>
              sum + Object.values(rep).reduce((sum, curr) => sum + curr, 0),
            0
          ),
        });
      });
  }, [fetchTrigger]);

  const [dataTransfer, setDataTransfer] = useState(0);

  useEffect(() => {
    fetchNFTChunk()
      .then((data) => checkAndFetchNextChunk(data))
      .then(setDataTransfer)
      .then(() => console.log("chunks count", chunkCount));
  }, []);

  return (
    <div className="container">
      <div className="row pt-3">
        <div className="col-md-2 col-md-offset-12">
          <Sidebar></Sidebar>
        </div>
        <div className="col-md-10 pt-4">
          <div className="row  pt-3">
            <div className="col-12 pb-2">
              <h3>KOII Statistics</h3>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <span className="fs-5">number of wallets created</span>
            </div>
            <div className="col-6">
              <span className="fs-5">
                {mainNetStatsState.wallets.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="row  pt-3">
            <div className="col-6">
              <span className="fs-5">NFTs created</span>
            </div>
            <div className="col-6">
              <span className="fs-5">
                {attentionStatsState.nftCount.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="row  pt-3">
            <div className="col-6">
              <span className="fs-5">NFTs views</span>
            </div>
            <div className="col-6">
              <span className="fs-5">
                {attentionStatsState.nftViews.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="row  pt-3">
            <div className="col-6">
              <span className="fs-5">data size stored on Arweave</span>
            </div>
            <div className="col-6">
              <span className="fs-5">{formatBytes(dataTransfer)}</span>
            </div>
          </div>
          <div className="row  pt-3">
            <div className="col-6">
              <span className="fs-5">KOII tokens transacted</span>
            </div>
            <div className="col-6">
              <span className="fs-5">{mainNetStatsState.koiiTransacted}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
