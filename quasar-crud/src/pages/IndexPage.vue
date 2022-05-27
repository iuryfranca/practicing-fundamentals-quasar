<template>
  <q-page padding>
    <q-table
      title="Dados da API"
      class="padding"
      :rows="posts"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      posts: ref([]),
      columns: [
        { name: 'id',  align: 'left', field: 'id', label: 'Id', sortable: true },
        { name: 'title',  align: 'left', field: 'title', label: 'Título', sortable: true },
        { name: 'author',  align: 'left', field: 'author', label: 'Autor', sortable: true },
        // { name: 'content', field: 'content', label: 'Conteúdo', sortable: true },
      ]
    }
  },

  mounted() {
    this.getPosts()
  },

  methods: {
    getPosts() {
      try {
        api.get('/posts').then(response => {
          this.posts = response.data
          console.log(response.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
})
</script>
