<template>
  <footer class="bg-gray-800">
    <b-container>
      <b-row align-h="between" align-v="center">
        <b-col cols="auto">
          <ul class="list-inline mb-0">
            <li class="list-inline-item mb-0">
              <b-navbar-brand class="mb-0">
                <g-link to="/" class="nav-link text-white">
                  <font-awesome :icon="['fas', 'plus-square']"></font-awesome>
                  {{ $static.metadata.siteName }}
                </g-link>
              </b-navbar-brand>
            </li>
          </ul>
        </b-col>
        <b-col cols="auto" class="text-sm-right">
          <ul class="list-inline mb-0">
            <li class="list-inline-item mb-0">
              
                <g-link to="/pages/imprint" class="nav-link">
                  Imprint
                </g-link>
              
            </li>
            <li class="list-inline-item mb-0">
              
                <g-link to="/pages/privacy-policy" class="nav-link">
                  Privacy
                </g-link>
              
            </li>
            <li class="list-inline-item mb-0">
              
                <g-link to="/credits" class="nav-link">
                  Credits
                </g-link>
              
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>