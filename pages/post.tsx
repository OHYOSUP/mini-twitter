import { useForm } from "react-hook-form";
import useMutation from "../lib/useMutation";



export default function Post() {
  const { register, handleSubmit, reset } = useForm();
  const [post] = useMutation("/api/post");
  const onValid = (data: any) => {
    console.log(data);
    post(data);
    reset();
  };
  

  return (
    <div className="w-[100%] h-[100vh] flex justify-center">
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-[40vw] gap-5 bg-slate-300 flex flex-col justify-center px-24"
      >
        <input
          className="p-3 w-[30vw] rounded-md"
          type="text"
          {...register("title", { required: true })}
          placeholder="Title"
        />
        <textarea
          className="p-3 w-[30vw] rounded-md h-[20vh]"
          {...register("twitt", { required: true })}
          placeholder="트윗을 작성하세요"
        />
        <button className="bg-[#1D9BF0] p-3 rounded-md text-white w-24">
          트윗
        </button>
      </form>
    </div>
  );
}
