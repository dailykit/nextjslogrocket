import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

export default function Page(props) {
  const { isFallback, push } = useRouter();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      console.log("Fetching posts!");
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setPosts(data);
    })();
  }, []);

  if (isFallback) {
    return <></>;
  }

  return (
    <div className="container">
      <h1 className="header">{props.data.name}</h1>
      <Link href="/google">Google</Link>
      <p onClick={() => push("/facebook")}>{props.data.description}</p>
      <p>{props.params.domain}</p>
      <p>{props.params.slugs}</p>
      <p>{Math.floor(Math.random() * 100 + 1)} random</p>
      <p>{posts.length} posts fetched!</p>
    </div>
  );
}
