interface ICommentTypes {
  id: number;
  comment: string;
  user: {
    username: string;
  };
}
interface ICommnetProps {
  comments: ICommentTypes[] | undefined;
}

export default function CommentList({comments}: ICommnetProps) {
  return (
    <div>
      {comments?.map((comment) => (
        <div key={comment.id} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="size-4 bg-red-400 rounded-full" />
            <span>{comment.user.username}</span>
          </div>
          <span>{comment.comment}</span>
        </div>
      ))}
    </div>
  );
}
