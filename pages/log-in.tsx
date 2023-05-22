import { useForm } from "react-hook-form";
import useMutation from "../lib/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const [enter, { data }] = useMutation(`/api/users/enter`);
  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (data: any) => {
    enter(data);
  };

  useEffect(() => {
    if (data && data.ok) {
      alert("로그인 되었습니다");
      router.push("/");
    } else if (data && data.ok === false) {
      alert(data.error);
    }
  }, [data, router]);
  console.log(data);

  return (
    <div className="flex flex-col gap-6 w-full h-[100vh] justify-center items-center bg-[#1D9BF0]">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col max-w-3xl items-center gap-6"
      >
        <input
          {...register("email", { required: "이메일은 필수입니다." })}
          className="w-[25vw] p-3 rounded-md"
          type="email"
          placeholder="이메일을 입력하세요"
        />
        {errors.email && <p className="text-white">{errors.email.message}</p>}
        <input
          {...register("password", {
            required: "비밀번호가 맞지 않습니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상입니다.",
            },
          })}
          className="w-[25vw] p-3 rounded-md"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && (
          <p className="text-white">{errors.password.message}</p>
        )}

        <button
          onClick={() => {
            [
              {
                type: "manual",
                name: "email",
                message: "이메일이 맞지 않습니다.",
              },
              {
                type: "manual",
                name: "password",
                message: "비밀번호를 확인하세요.",
              },
            ].forEach(({ type, name, message }) => {
              setError(name, { type, message });
            });
          }}
          className="bg-white p-2 w-[25vw] rounded-md"
        >
          로그인
        </button>
      </form>
      <button
        onClick={() => router.push("/create-account")}
        className="bg-[#c2cddf] p-2 w-[25vw] rounded-md"
      >
        가입하기
      </button>
    </div>
  );
};

export default Login;
