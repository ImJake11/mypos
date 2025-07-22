import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";


function SidebarSubButton({ url, name }: {
    url: string, name: string,
}) {
    const pathName = usePathname();

    const isSelected = pathName === url;

    return <motion.div className='min-w-[var(--sidebar-width)] grid place-content-center h-[2.5rem] w-fit'
        style={{
            backgroundColor: "var(--sidebar-submenu-bg)",
            color: isSelected ? "var(--color-brand-primary)" : "var(--foreground)",
        }}
        whileHover={{
            color: "var(--color-brand-primary)",
        }}
    >
        <Link href={url}>
            {name}
        </Link>
    </motion.div>

}

export default SidebarSubButton;