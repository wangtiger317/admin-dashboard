<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        md="12"
      >
        <h4>Members</h4>
        <hr>
      </b-col>
    </b-row>
    <b-row>
      <h4 class="pl-5 py-1">
        User
      </h4>
      <hr>
      <b-col
        cols="12"
        md="12"
        class="d-flex align-items-center justify-content-center"
      >
        <b-col
          rows="3"
          md="3"
        >
          <b-form-checkbox
            checked="false"
            name="check-button"
            switch
            inline
          >
            <h5>Can Access Admin Users</h5>
          </b-form-checkbox>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script></script>
