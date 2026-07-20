
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = authClient.useSession();

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Browse Service", href: "/browse-service" },
        { name: "About Us", href: "/about-us" },
    ];

    // Role অনুযায়ী Dashboard Route
    const dashboardPath =
        (session?.user as { role?: string })?.role === "provider"
            ? "/dashboard/provider"
            : "/dashboard/customer";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary shadow-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-lg font-black text-white shadow-md">
                        H
                    </div>

                    <span className="text-2xl font-extrabold text-white">
                        Handy<span className="text-accent">Hub</span>
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-medium transition-colors duration-200 ${pathname === item.href
                                ? "text-accent"
                                : "text-white hover:text-accent"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Authentication */}
                <div className="flex items-center gap-4">
                    {session ? (
                        <>
                            {/* Dashboard */}
                            <Link href={dashboardPath}>
                                <Button className="rounded-full bg-accent px-6 py-2 font-semibold text-white transition-all duration-300 hover:opacity-90">
                                    Dashboard
                                </Button>
                            </Link>

                            {/* Logout */}
                            <Button
                                onClick={async () => {
                                    await authClient.signOut();
                                    window.location.reload();
                                }}
                                className="rounded-full bg-red-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="font-medium text-white transition-colors duration-200 hover:text-accent"
                            >
                                Login
                            </Link>

                            <Link href="/signup">
                                <Button className="rounded-full bg-accent px-6 py-2 font-semibold text-white transition-all duration-300 hover:opacity-90">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;

