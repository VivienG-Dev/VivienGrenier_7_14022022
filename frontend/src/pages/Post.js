import React from "react";
// Pour extraire l'ID du post, à partir de l'URL (équivalent JS de new URL(location.href).searchParams.get(param);)
import { useParams } from "react-router-dom";

function Post() {
  let { id } = useParams();
  return <div>{id}</div>;
}

export default Post;
