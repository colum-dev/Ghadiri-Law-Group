import AdminShell from "../layouts/admin/admin/AdminShell"

export const metadata = {
    title: 'پنل مدیریت',
    robots: { index: false, follow: false },
}

export default function AdminLayout({ children }) {
    return <AdminShell>{children}</AdminShell>
}
