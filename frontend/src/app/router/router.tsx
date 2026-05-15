import { lazy, Suspense, type ComponentType } from "react"
import { createBrowserRouter } from "react-router-dom"
import { MainLayout } from "@/layouts/MainLayout/MainLayout"
import { AuthLayout } from "@/layouts/AuthLayout/AuthLayout"
import { Loader } from "@/shared/ui/Loader/Loader"
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage"
import { AdminRoute } from "./AdminRoute"
import { ProtectedRoute } from "./ProtectedRoute"
import { authLayoutRoutes, mainLayoutRoutes, type AppRoute } from "./routesConfig"

function lazyRoute(route: AppRoute) {
	const LazyPage = lazy(route.lazy)

	let element = (
		<Suspense fallback={<Loader />}>
			<LazyPage />
		</Suspense>
	)

	if (route.requireAuth) {
		element = <ProtectedRoute>{element}</ProtectedRoute>
	}

	if (route.roles?.includes("ADMIN")) {
		element = <AdminRoute>{element}</AdminRoute>
	}

	return {
		path: route.path === "/" ? undefined : route.path.replace(/^\//, ""),
		index: route.path === "/",
		element,
	}
}

export const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: mainLayoutRoutes.map(lazyRoute),
	},
	{
		element: <AuthLayout />,
		children: authLayoutRoutes.map((route) => ({
			path: route.path.replace(/^\//, ""),
			lazy: async () => {
				const module = await route.lazy()
				const Component = module.default as ComponentType
				return {
					element: (
						<Suspense fallback={<Loader />}>
							<Component />
						</Suspense>
					),
				}
			},
		})),
	},
	{
		path: "/forbidden",
		lazy: async () => {
			const module = await import("@/pages/ForbiddenPage/ForbiddenPage")
			return { Component: module.default }
		},
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
])
