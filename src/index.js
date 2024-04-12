import React from "react";
import createRoot from "react-dom";
import Card from "./components/Card";
import "../src/index.css";
import Heading from "./components/Heading";



createRoot.render(
  <>
  <Heading/>
  <div className="background">
  <div className="card__container">
  <Card imgSrc = "https://picsum.photos/id/1/200/200" category = " Netflix Original Series" title="Avenger"/>
  <Card imgSrc = "https://picsum.photos/id/2/200/200" category = " Netflix Original Series" title="Money Heist"/>
  <Card imgSrc = "https://picsum.photos/id/3/200/200" category = " Netflix Original Series" title="Squid Game"/>
  <Card imgSrc = "https://picsum.photos/id/1/200/200" category = " Netflix Original Series" title="Avenger"/>
  <Card imgSrc = "https://picsum.photos/id/2/200/200" category = " Netflix Original Series" title="Money Heist"/>
  <Card imgSrc = "https://picsum.photos/id/3/200/200" category = " Netflix Original Series" title="Squid Game"/>
  </div>
  </div>
  </>,
  document.getElementById("root")
)