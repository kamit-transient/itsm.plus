<template>
  <div>
    <ul class="list-unstyled">
      <li>
        <g-link to="/resources" class="btn btn-sm btn-outline-primary" active-class="no-active">
          <font-awesome :icon="['fas', 'times-circle']"></font-awesome> Remove filter
        </g-link>
      </li>
    </ul>

    <h6>Filter by type</h6>

    <ul class="ml-3 list-unstyled">
      <li>
        <g-link :to="filterUrl('type', 'site')">Site</g-link>
      </li>
      <li>
        <g-link :to="filterUrl('type', 'repository')">Repository</g-link>
      </li>
    </ul>

    <h6>Filter by tag</h6>

    <ul class="ml-3 list-unstyled">
      <li v-for="tag in filterTags" :key="tag">
        <g-link :to="filterUrl('tags', tag)">{{tag}}</g-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { each, uniq } from "lodash";

export default {
  methods: {
    filterUrl(type, value) {
      return `/resources/filter/${type}/${value}`;
    }
  },
  computed: {
    filterTags() {
      var tags = [];

      each(this.$static.resourceTags.edges, function(node) {
        each(node.node.tags, function(tag) {
          tags.push(tag.id);
        });
      });

      return uniq(tags);
    }
  }
};
</script>

<static-query>
  query {
    
    resourceTags : allResource {
      edges {
        node {
          tags { id }
        }
      }
    }
  }
</static-query>