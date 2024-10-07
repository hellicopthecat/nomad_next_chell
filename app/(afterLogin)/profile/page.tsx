import client from "@/libs/client";
import getSession from "@/libs/session";

const userData = async () => {
  const session = await getSession();
  const user = await client.user.findUnique({
    where: {id: session.id},
    select: {id: true, username: true, bio: true},
  });
  return {user};
};
export default async function Profile() {
  const {user} = await userData();
  return (
    <div className="text-white">
      <div className="flex gap-10">
        <h1>UserID : </h1>
        <h1>{user?.id}</h1>
      </div>
      <div className="flex gap-10">
        <h1>UserName : </h1>
        <h1>{user?.username}</h1>
      </div>
      <div className="flex gap-10">
        <h1>BIO : </h1>
        <h1>{user?.bio ? user?.bio : "BIO의 내용이 없습니다."}</h1>
      </div>
    </div>
  );
}
