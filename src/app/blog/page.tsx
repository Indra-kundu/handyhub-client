import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

// ব্লগ পোস্টের জন্য TypeScript ইন্টারফেস
type BlogPost = {
    id: string;
    title: string;
    date: string;
    category: string;
    description: string;
    image: string;
};

// সার্ভিস সম্পর্কিত কিছু ব্লগ ডেটা
const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "How to Maintain Your Home Appliances Efficiently",
        date: "May 20, 2026",
        category: "Home Repair",
        description: "Regular maintenance of home appliances like AC, washing machines, and electrical systems can save you money and extend their lifespan. Learn the best expert tips to keep your home running smoothly all year round.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "2",
        title: "Top 5 Benefits of Professional Deep Cleaning",
        date: "May 18, 2026",
        category: "Cleaning Service",
        description: "A clean home is a healthy home. Professional deep cleaning removes hidden dust, allergens, and bacteria that regular cleaning often misses. Discover why hiring professional cleaners is a game-changer for your family.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "3",
        title: "Electrical Safety Tips Every Homeowner Should Know",
        date: "May 15, 2026",
        category: "Electrical Service",
        description: "Electrical issues can be dangerous if ignored. From overloaded sockets to flickering lights, recognizing early warning signs can prevent major hazards. Always trust certified professionals for safe electrical repairs.",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    },
];

export default function BlogPage() {
    return (
        <section className="min-h-screen bg-bg-page py-12">
            <div className="mx-auto max-w-7xl px-6">
                {/* Heading */}
                <div className="mb-12 text-center">
                    <span className="rounded-full bg-accent/15 px-4 py-2 text-sm font-semibold text-accent">
                        Our Blog & Articles
                    </span>
                    <h1 className="mt-4 text-4xl font-bold text-text-main">
                        Insights & Service Guides
                    </h1>
                    <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                        Read expert tips, guides, and updates regarding home repair, cleaning, and professional maintenance services.
                    </p>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
                        >
                            {/* Image Container */}
                            <div className="relative h-52 w-full">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                                    <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                                        {post.category}
                                    </span>
                                    <span>{post.date}</span>
                                </div>

                                <h2 className="text-xl font-bold text-text-main mb-3">
                                    {post.title}
                                </h2>

                                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
                                    {post.description}
                                </p>

                                <Link href="/browse-service">
                                    <Button className="w-full rounded-full bg-primary text-white font-semibold transition hover:opacity-90">
                                        Book Related Service →
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}