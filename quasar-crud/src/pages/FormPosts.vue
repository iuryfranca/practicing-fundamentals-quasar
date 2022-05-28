<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        v-model="form.title"
        outlined
        filled
        label="Título"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />
      <q-input
        v-model="form.author"
        outlined
        filled
        label="Autor"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />
      <div>
        <q-editor
          v-model="form.content"
          min-height="4rem"
          placeholder="Digite aqui o conteúdo"
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
      </div>
      <div class="q-gutter-sm">
        <q-btn
          label="Salvar"
          color="white"
          class="float-right"
          text-color="primary"
          icon="save"
          type="submit"
        />
        <q-btn
          label="Cancelar"
          color="primary"
          class="float-right"
          :to="{ name: 'home' }"
        />
      </div>
    </q-form>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import usePost from "src/services/posts";

export default defineComponent({
  name: "FormPosts",
  setup() {
    const { post, getById, update } = usePost();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();

    const form = ref({
      title: "",
      content: "",
      author: "",
    });

    onMounted(async () => {
      if (route.params.id) {
        getPostById(route.params.id);
      }
    });

    const getPostById = async (id) => {
      try {
        const response = await getById(id);
        form.value = response;
      } catch (error) {
        $q.notify({
          color: "negative",
          textColor: "white",
          message: error.response.data.message,
        });
      }
    };

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value);
          $q.notify({
            message: "Post atualizado com sucesso!",
            color: "positive",
            icon: "done",
          });
        } else {
          await post(form.value);
          $q.notify({
            message: "Post adicionado com sucesso!",
            color: "positive",
            icon: "done",
          });
        }
        router.push({ name: "home" });
      } catch (error) {
        console.log(error);
        $q.notify({
          message: "Alguma coisa de errado aconteceu :(",
          color: "negative",
        });
      }
    };

    return {
      form,
      onSubmit,
    };
  },
});
</script>
