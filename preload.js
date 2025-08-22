console.log("✅ preload.js is running");

const { contextBridge } = require("electron");


contextBridge.exposeInMainWorld("env", {
  WEATHER_API_KEY: process.env.WEATHER_API_KEY
});