import { useForm } from "react-hook-form";
import useMutation from "../lib/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CreateAccount = () => {
  const [enter, { data }] = useMutation("/api/users/create");
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onValid = (data: any) => {
    enter(data);
    reset();
  };

  const router = useRouter()
  useEffect(()=>{
    if(data && data.ok){
      alert("계정이 생성되었습니다!")
      router.push('/log-in')
    }
  },[router, data])
  

  return (
    <div className="flex flex-col w-full h-[100vh] justify-center items-center bg-[#1D9BF0]">
      <div className="flex items-start justify-start p-2 h-10 w-[25vw] mb-10">
        <h1 className="text-white text-3xl">계정을 생성하세요</h1>
      </div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col max-w-3xl items-center gap-6"
      >
        <input
          {...register("name", {
            required: "이름을 입력하세요",
            minLength: {
              value: 2,
              message: "이름은 두 글자 이상입니다",
            },
          })}
          type="name"
          placeholder="이름을 입력하세요"
          className="w-[25vw] p-3 rounded-md"
        />
        <input
          {...register("email", { required: "이메일을 입력하세요" })}
          type="email"
          placeholder="이메일을 입력하세요"
          className="w-[25vw] p-3 rounded-md"
        />
        {errors.email && <p className="text-white">{errors.email.message}</p>}
        <input
          {...register("password", {
            required: "비밀번호를 입력하세요",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상입니다.",
            },
          })}
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="w-[25vw] p-3 rounded-md"
        />
        {errors.password && (
          <p className="text-white">{errors.password.message}</p>
        )}

        <button
          className="bg-white p-3 w-28 rounded-md"
          onClick={() => {
            [
              {
                type: "manual",
                name: "email",
                message: "이메일을 확인하세요",
              },
              {
                type: "manual",
                name: "password",
                message: "비밀번호를 확인하세요",
              },
            ].forEach(({ type, name, message }) => {
              setError(name, { type, message });
            });
          }}
        >
          만들기
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
