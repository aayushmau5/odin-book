import Head from "next/head";

import MainLayout from "@/components/MainLayout";

interface FriendsData {
  id: string;
  imageUrl: string;
  username: string;
  name: string;
}

const friendsData: FriendsData[] = [
  {
    id: "1",
    username: "username1",
    imageUrl: "imageUrl1",
    name: "First Last 1",
  },
  {
    id: "2",
    username: "username-2",
    imageUrl: "imageUrl-2",
    name: "First Last 2",
  },
  {
    id: "3",
    username: "username-3",
    imageUrl: "imageUrl-3",
    name: "First Last 3",
  },
  {
    id: "4",
    username: "username-4",
    imageUrl: "imageUrl-4",
    name: "First Last 4",
  },
  {
    id: "5",
    username: "username-5",
    imageUrl: "imageUrl-5",
    name: "First Last 5",
  },
  {
    id: "6",
    username: "username-6",
    imageUrl: "imageUrl-6",
    name: "First Last 6",
  },
  {
    id: "7",
    username: "username-7",
    imageUrl: "imageUrl-7",
    name: "First Last 7",
  },
  {
    id: "8",
    username: "username-8",
    imageUrl: "imageUrl-8",
    name: "First Last 8",
  },
  {
    id: "9",
    username: "username-9",
    imageUrl: "imageUrl-9",
    name: "First Last 9",
  },
  {
    id: "10",
    username: "username-10",
    imageUrl: "imageUrl-10",
    name: "First Last 10",
  },
];

export default function friendsPage() {
  return (
    <>
      <Head>
        <title>Friends | Odin Book</title>
      </Head>
      <MainLayout centerComponent={data()} />
    </>
  );
}

function data() {
  return (
    <div>
      {friendsData.map((friend) => (
        <div key={friend.id}>{friend.name}</div>
      ))}
    </div>
  );
}
