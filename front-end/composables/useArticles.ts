import type { Article } from "~/models";

export function useArticles() {
    const articles = ref<Article[]>([])
    const apiurl = useRuntimeConfig().public.apiUrl

    async function FetchArticles() {
        articles.value = await $fetch<Article[]>(`${apiurl}/articles`)
    }

    async function HandleAddArticle(formArticle: Ref<Article>) {
        await useFetch('http://localhost:3001/articles', {
            method: 'POST',
            body: formArticle.value,
            headers: {
            'Access-Control-Allow-Origin': '*',
            }
        })
    }

    async function HandleDeleteArticle(id: number) {
        await useFetch(`http://localhost:3001/articles/${id}`, {
            method: 'DELETE',
            headers: {
            'Access-Control-Allow-Origin': '*',
            }
        })
    }

    async function HandleUpdateArticle(id: number, formArticle: Ref<Article>) {
        await useFetch(`http://localhost:3001/articles/${id}`, {
            method: 'PUT',
            body: formArticle.value,
            headers: {
            'Access-Control-Allow-Origin': '*',
            }
        })
    }

    return {
        articles,
        FetchArticles,
        HandleAddArticle,
        HandleDeleteArticle,
        HandleUpdateArticle,
    }
}