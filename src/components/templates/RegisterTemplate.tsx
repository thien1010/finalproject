import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "services";
import { RegisterSchema, RegisterSchemaType } from "schema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PATH } from "constant";
import { handleError, sleep } from "utils";
import { Button, Center, Input } from "@chakra-ui/react";

export const RegisterTemplate = () => {
  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-4/6"
          style={{
            backgroundImage: "url(/images/image1.jpg)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h1 className="text-8xl font-bold text-white sm:text-6xl transition-all duration-300 ease-in-out hover:text-blue-500">
                facebook
              </h1>

              <p className="max-w-xl mt-3 text-gray-300">
                Connect with friends and the world around you on facebook
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-3/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-12 h-12 sm:h-12 sm:w-12"
                  src="/images/logo.png"
                  alt="#"
                />
              </div>
            </div>
            <div className="mt-4">
              <FormRegister />
              <div className="flex justify-center mx-auto mt-10">
                <img
                  className="w-30 h-30 sm:h-10  "
                  src="/images/meta.png"
                  alt="#"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    try {
      setIsLoading(true);
      await authService.register(data);
      await sleep();
      toast.success("Register successfully");
      //redirect về page login
      navigate(PATH.login);
    } catch (error) {
      handleError(error, "Email already exists");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="mt-6">
          <label
            htmlFor="fullName"
            className="block mb-2 text-sm text-gray-800 dark:text-gray-800"
          >
            Full Name
          </label>
          <Input
            {...register("fullName")}
            type="text"
            placeholder="Full Name"
            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40"
          />
          {errors?.fullName?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm text-gray-800 dark:text-gray-800"
        >
          Email Address
        </label>
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40"
        />
        {errors?.email?.message && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mt-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm text-gray-800 dark:text-gray-800"
        >
          Password
        </label>

        <Input
          {...register("password")}
          type="password"
          placeholder="Your Password"
          className="block w-full px-4 py-2 pr-10 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <div className="mt-6">
        <label
          htmlFor="date"
          className="block mb-2 text-sm text-gray-800 dark:text-gray-800"
        >
          Date of Birth
        </label>
        <Input
          {...register("dateOfBirth")}
          type="date"
          placeholder="Date of Birth"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>
      <Center>
        <Button
          type="submit"
          colorScheme="whatsapp"
          isLoading={isLoading}
          className="mt-7 !w-full"
        >
          Create New Account
        </Button>
      </Center>
    </form>
  );
};
