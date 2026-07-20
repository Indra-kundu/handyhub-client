"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
    Button,
    Description,
    Fieldset,
    Form,
    Input,
    Label,
    Surface,
    TextField,
    Select,
    ListBox,
    TextArea,
} from "@heroui/react";


type SignupData = {
    name: string;
    email: string;
    password: string;
    role: "customer" | "provider";
    phone: string;
    address: string;
};



export default function SignUpPage() {

    const router = useRouter();

    const [error, setError] = useState("");

    const [role, setRole] =
        useState<"customer" | "provider">("customer");




    const onSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setError("");


        const formData =
            new FormData(e.currentTarget);



        const data: SignupData = {

            name: formData.get("name") as string,

            email: formData.get("email") as string,

            password:
                formData.get("password") as string,

            role,

            phone:
                formData.get("phone") as string,

            address:
                formData.get("address") as string,

        };




        try {


            const result =
                await authClient.signUp.email({

                    email: data.email,

                    password: data.password,

                    name: data.name,

                    ...({
                        role: data.role,
                        phone: data.phone,
                        address: data.address,
                    } as Record<string, string>),

                });



            if (result.error) {

                throw new Error(
                    result.error.message
                );

            }



            router.push("/");



        } catch (err) {


            console.error(err);


            setError(
                err instanceof Error
                    ? err.message
                    : "Signup failed"
            );


        }

    };





    return (

        <section
            className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-bg-page
        px-4
        py-10
      "
        >


            <Surface
                className="
          w-full
          max-w-lg
          rounded-3xl
          bg-white
          p-8
          shadow-xl
          border
          border-gray-100
        "
            >


                <Form onSubmit={onSubmit}>


                    <Fieldset className="space-y-5">



                        {/* Header */}

                        <div className="text-center">


                            <Fieldset.Legend
                                className="
                  text-3xl
                  font-bold
                  text-text-main
                "
                            >
                                Create Account
                            </Fieldset.Legend>



                            <Description
                                className="
                  mt-2
                  text-gray-500
                "
                            >
                                Join HandyHub and start your journey
                            </Description>


                        </div>





                        {error && (

                            <div
                                className="
                  rounded-xl
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  text-red-600
                "
                            >
                                {error}
                            </div>

                        )}






                        {/* Name */}

                        <TextField
                            name="name"
                            isRequired
                        >

                            <Label className="mb-2 font-semibold text-text-main">
                                Name
                            </Label>


                            <Input
                                placeholder="Enter your name"
                                className="
                  rounded-xl
                  bg-gray-50
                  border
                  border-gray-200
                "
                            />


                        </TextField>






                        {/* Email */}

                        <TextField
                            name="email"
                            type="email"
                            isRequired
                        >

                            <Label className="mb-2 font-semibold text-text-main">
                                Email
                            </Label>


                            <Input
                                placeholder="Enter your email"
                                className="
                  rounded-xl
                  bg-gray-50
                  border
                  border-gray-200
                "
                            />


                        </TextField>







                        {/* Password */}

                        <TextField
                            name="password"
                            type="password"
                            isRequired
                        >

                            <Label className="mb-2 font-semibold text-text-main">
                                Password
                            </Label>


                            <Input
                                placeholder="Create password"
                                className="
                  rounded-xl
                  bg-gray-50
                  border
                  border-gray-200
                "
                            />


                        </TextField>








                        {/* Role */}

                        <Select
                            name="role"
                            isRequired
                            placeholder="Select role"
                            selectedKey={role}
                            onSelectionChange={(key) =>
                                setRole(
                                    key as "customer" | "provider"
                                )
                            }
                        >

                            <Label className="mb-2 font-semibold text-text-main">
                                Signup As
                            </Label>



                            <Select.Trigger
                                className="
                  rounded-xl
                  bg-gray-50
                  border
                  border-gray-200
                "
                            >

                                <Select.Value />

                                <Select.Indicator />

                            </Select.Trigger>





                            <Select.Popover
                                className="
                  rounded-xl
                  bg-white
                  border
                  shadow-lg
                "
                            >

                                <ListBox>


                                    <ListBox.Item
                                        id="customer"
                                        textValue="customer"
                                        className="hover:bg-gray-100"
                                    >
                                        Customer
                                    </ListBox.Item>




                                    <ListBox.Item
                                        id="provider"
                                        textValue="provider"
                                        className="hover:bg-gray-100"
                                    >
                                        Provider
                                    </ListBox.Item>


                                </ListBox>


                            </Select.Popover>


                        </Select>








                        {/* Phone */}

                        <TextField name="phone">


                            <Label className="mb-2 font-semibold text-text-main">
                                Phone
                            </Label>


                            <Input
                                placeholder="Your phone number"
                                className="
                  rounded-xl
                  bg-gray-50
                  border
                  border-gray-200
                "
                            />


                        </TextField>









                        {/* Address */}

                        <TextField name="address">


                            <Label className="mb-2 font-semibold text-text-main">
                                Address
                            </Label>



                            <TextArea
                                placeholder="Your address"
                                className="
                  rounded-xl
                  bg-gray-50
                  border
                  border-gray-200
                "
                            />


                        </TextField>








                        {/* Submit */}

                        <Button
                            type="submit"
                            className="
                mt-3
                w-full
                rounded-full
                bg-primary
                py-3
                font-semibold
                text-white
                shadow-md
                hover:opacity-90
              "
                        >
                            Create Account
                        </Button>





                        <p
                            className="
                text-center
                text-sm
                text-gray-500
              "
                        >

                            Already have an account?

                            <span
                                className="
                  ml-1
                  cursor-pointer
                  font-semibold
                  text-accent
                "
                            >
                                Sign In
                            </span>

                        </p>




                    </Fieldset>


                </Form>


            </Surface>


        </section>

    );
}