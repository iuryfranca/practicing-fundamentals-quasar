<template>
  <q-page padding>
    <q-table
      title="Dados da API"
      class="padding"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <span class="text-h5">Artigo</span>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{ name: 'formPosts' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            size="md"
            icon="delete"
            color="negative"
            dense
            @click="handleDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import usePost from "src/services/posts";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const posts = ref([]);
    const { list, remove } = usePost();
    const $q = useQuasar();
    const columns = [
      { name: "id", align: "left", field: "id", label: "Id", sortable: true },
      {
        name: "title",
        align: "left",
        field: "title",
        label: "Título",
        sortable: true,
      },
      {
        name: "author",
        align: "left",
        field: "author",
        label: "Autor",
        sortable: true,
      },
      {
        name: "actions",
        align: "center",
        field: "actions",
        label: "Ações",
        sortable: true,
      },
    ];

    onMounted(() => {
      getPosts();
    });

    const getPosts = async () => {
      try {
        const data = await list();
        posts.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const handleDelete = async (id) => {
      try {
        $q.dialog({
          title: "Remover",
          message: "Deseja remover esse post?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id);
          $q.notify({
            message: "Post removido com sucesso!",
            color: "positive",
            icon: "done",
          });
          await getPosts();
        });
      } catch (error) {
        $q.notify({
          message: "Post removido com sucesso!",
          color: "positive",
          icon: "times",
        });
      }
    };

    return {
      posts,
      columns,
      handleDelete,
    };
  },
});
</script>
