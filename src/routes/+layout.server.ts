export type Themes = "lightTheme" | "darkTheme" | "systemTheme"

export function load({ cookies }) {
    let cookieTheme = cookies.get("theme") as (Themes | undefined)
    const theme: Themes = cookieTheme ? cookieTheme : "systemTheme";

    return {
        theme
    }
}