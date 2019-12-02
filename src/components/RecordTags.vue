<template>
   <div class="tags-items">
   		<g-link class="mr-2" v-for="tag in record.tags" :key="tag.id" :to="tag.path">
   			<span>#</span>{{ tag.title }}
   		</g-link>
    </div>
</template>

<script>
export default {
  props: ['record']
}
</script>