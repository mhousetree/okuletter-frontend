<script>
    import { afterNavigate } from '$app/navigation'

    afterNavigate(async () => {
        console.log(document.title.split(' ')[0])
    })
</script>

<header></header>
<main>
    <slot />
</main>
