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
} from "@heroui/react";

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await authClient.signIn.email({
                email,
                password,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            // সফল হলে হোম পেজে রিডাইরেক্ট
            router.push("/");
            router.refresh();
        } catch (err) {
            console.error(err);
            setError(
                err instanceof Error ? err.message : "Invalid email or password"
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)] p-4">
            <Surface className="w-full max-w-lg p-8 bg-[var(--color-surface)] rounded-2xl border border-gray-700 shadow-2xl">
                <Form onSubmit={onSubmit}>
                    <Fieldset className="space-y-4">
                        <Fieldset.Legend className="text-3xl text-[var(--color-text-primary)] font-bold">
                            Welcome Back
                        </Fieldset.Legend>

                        <Description className="text-gray-400">
                            Sign in to your HandyHub account
                        </Description>

                        {error && (
                            <p className="text-red-400 text-sm">{error}</p>
                        )}

                        <TextField name="email" type="email" isRequired>
                            <Label className="text-gray-300">Email</Label>
                            <Input className="bg-gray-800 border-gray-600 text-white" />
                        </TextField>

                        <TextField name="password" type="password" isRequired>
                            <Label className="text-gray-300">Password</Label>
                            <Input className="bg-gray-800 border-gray-600 text-white" />
                        </TextField>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-primary text-white font-semibold py-2.5 rounded-lg mt-4"
                        >
                            Sign In
                        </Button>
                    </Fieldset>
                </Form>
            </Surface>
        </div>
    );
}