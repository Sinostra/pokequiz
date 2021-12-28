<template>
  <div class="score">
    <div class="score-wrapper">

      <div v-if="hasError" class="ajax-error-msg">{{$store.state.localisation.dataLang['ajaxErrorText']}}</div>

      <div v-if="!hasError && !canDisplayScores && scoreToAdd && !loading" class="input-wrapper">
        <label for="name">{{$store.state.localisation.dataLang['nameInstruct']}}</label>

        <Error :message="$store.state.localisation.dataLang['nameError']" :hasError="playerNameError" v-on:errorFaded="playerNameError = false"/>

        <input v-model="playerName" id="name" type="text" maxlength="20"/>

        <div class="btn-wrapper">
          <div v-on:click="clickValidate()" class="btn submit green-btn">{{$store.state.localisation.dataLang['validateNameText']}}</div>
        </div>
        
      </div>

      <div v-if="!loading" class="table-scores-wrapper">

        <div v-if="!hasError && canDisplayScores" class="settings">
          <div class="chosenGens">
            <div class="label">{{$store.state.localisation.dataLang['chosenGensText']}}</div>
            <div class="gens-wrapper">
              <div class="gen" v-for="(gen, cgen) in $store.state.settings.selectedGeneration" :key="cgen">
                {{gen}}
              </div>
            </div>
          </div>
          
          <div class="chosenTypes">
            <div class="label">{{$store.state.localisation.dataLang['chosenTypesText']}}</div>
            <div class="types-wrapper">
              <div class="type" v-for="(type, ctype) in $store.state.settings.selectedTypes" :key="ctype">
                <img :src="getUrl(type)">
              </div>
            </div>
          </div>

          <div class="chosenDifficulty">
            <div class="difficulty-label">
              {{$store.state.localisation.dataLang['chosenDifficultyText']}} {{$store.state.localisation.dataLang[this.$store.state.settings.selectedDifficulty + 'Text']}}
            </div>
            <div class="aternateForms-label">
              {{$store.state.localisation.dataLang['alternateFormsText']}}
              <span v-if="$store.state.settings.useAlternateForms">{{$store.state.localisation.dataLang['withText']}}</span>
              <span v-if="!$store.state.settings.useAlternateForms">{{$store.state.localisation.dataLang['withoutText']}}</span>
            </div>
            <div class="hints-label">
              {{$store.state.localisation.dataLang['hintsText']}}
              <span v-if="$store.state.settings.useHints">{{$store.state.localisation.dataLang['withText']}}</span>
              <span v-if="!$store.state.settings.useHints">{{$store.state.localisation.dataLang['withoutText']}}</span>
            </div>
          </div>
        </div>

        <div class="emptyScores" v-if="!hasError && canDisplayScores && emptyScores">{{$store.state.localisation.dataLang['noScoreText']}}</div>

        <div class="btn-wrapper">
          <div v-if="!$store.state.settings.hasBeenPlayed" v-on:click="clickPrevious()" class="btn previous green-btn">{{$store.state.localisation.dataLang['previousText']}}</div>
          <div v-on:click="playAgain()" class="btn green-btn">{{$store.state.localisation.dataLang['playAgainText']}}</div>
        </div>

        <div v-if="!hasError && canDisplayScores && !emptyScores" class="table-scores">
          <div class="table-head">
            <div class="table-cell rank">{{$store.state.localisation.dataLang['rangLabelText']}}</div>
            <div class="table-cell name">{{$store.state.localisation.dataLang['nameLabelText']}}</div>
            <div class="table-cell score">{{$store.state.localisation.dataLang['scoreText']}}</div>
            <div class="table-cell">{{$store.state.localisation.dataLang['timeLabelText']}}</div>
          </div>
          <div
            v-for="(score, index) in allScores['result']"
            :key="index"
            class="table-row"
            :class="score.id == lastEnteredId ? 'playedGame' : ''"
          >
            <div class="table-cell rank">{{ index + 1 }}</div>
            <div class="table-cell name">{{ obscenityFilter(score.name) }}</div>
            <div class="table-cell score">
              <div>{{ score.score }}/{{ totalNumber }}</div>
              <div class="percentage">&nbsp;({{parseInt((score.score / totalNumber) * 100)}}%)</div>
            </div>
            <div class="table-cell">{{ displayMinsAndSecs(score.time) }}</div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loader"></div>
      
    </div>
  </div>
</template>

<script>

import Error from './interfaceComponents/Error.vue'
export default {
  name: "Score",

  components: {
    Error
  },

  data: function () {
    return {
      playerName: "",
      playerNameError: false,
      useAlternateForms: 0,
      useHints: 0,
      gameSettings:
        this.$store.state.settings.selectedGeneration +
        " " +
        this.$store.state.settings.selectedTypes +
        " " +
        this.$store.state.settings.selectedDifficulty,
      numberOfFound: 0,
      totalNumber: Object.keys(this.$store.state.pokedex.currentDex).length,
      timeUsed: this.$store.state.settings.timeUsed,
      hasError: false,
      canDisplayScores: false,
      scoreToAdd: true,
      loading: false,
      allScores: {},
      lastEnteredId: 0,
      emptyScores: false,
      obscenities: ['fdp', 'bite', 'suce', 'tg', 'merde', 'fuck', 'conard'],
      serverUrl: '/server/',
      // serverUrl: 'http://localhost:8081/server/'
    };
  },

  methods: {
    getScore() {

      this.loading = true;
      this.scoreToAdd = false;

      let payload = {
        settings: this.gameSettings,
        alternateForms: this.useAlternateForms,
        hints: this.useHints
      };

      var formData = new FormData();
      formData.append("payload", JSON.stringify(payload));

      fetch(this.serverUrl, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.hasError = data.hasError;
          this.emptyScores = data.empty;
          this.allScores = data;
          this.canDisplayScores = true;
          this.loading = false;
        })
        .catch(() => {
          this.hasError = true
          this.loading = false
        });
    },

    addScore() {

      this.loading = true;

      for(const index in this.$store.state.pokedex.currentDex){
        if(this.$store.state.pokedex.currentDex[index]['found']) this.numberOfFound++
      }

      let payload = {
        settings: this.gameSettings,
        name: this.playerName,
        score: this.numberOfFound,
        time: this.timeUsed,
        alternateForms: this.useAlternateForms,
        hints: this.useHints
      };

      var formData = new FormData();
      formData.append("payload", JSON.stringify(payload));

      fetch(this.serverUrl + "?route=add", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.hasError = data.hasError;
          this.lastEnteredId = data.id;
          this.getScore()
        })
        .catch(() => {
          this.hasError = true
          this.loading = false
        });
    },

    clickValidate() {
      if(this.playerName.length > 0) this.addScore();
      else {
        this.playerNameError = true
      }
    },

    playAgain() {
      this.$store.dispatch("refillDex");
      this.$store.dispatch("rePlay");
    },

    displayMinsAndSecs(secs) {
      var remainSecs;
      var remainMinutes;

      if (secs > 59) {
        remainSecs = secs % 60;
        remainMinutes = (secs - remainSecs) / 60;
      } else {
        remainSecs = secs;
        remainMinutes = 0;
      }

      if (remainSecs < 10) remainSecs = "0" + remainSecs;
      if (remainMinutes < 10) remainMinutes = "0" + remainMinutes;

      return remainMinutes + ":" + remainSecs;
    },

    getUrl(type) {
      return require('../assets/img/languages/' + this.$store.state.localisation.chosenLang + '/types/'+ type + '.png')
    },

    clickPrevious() {
      this.$store.dispatch("refillDex");
      this.$store.dispatch("filterByGen", this.$store.state.settings.selectedGeneration)
      this.$store.dispatch("filterByType", this.$store.state.settings.selectedTypes)
      this.$store.dispatch("previousComp")
    },

    obscenityFilter(name) {

      //On stocke le nom de base
      var displayName = name

      //On stocke le nom sans majuscule, sans accent et sans lettres identiques qui se suivent (Téeeèst => test)
      var newName = name.toLowerCase().replace(/[é,è,ê,ë]/g, 'e').replace(/[î,ï,í,ì]/g, 'i').replace(/[â,ä,à]/g, 'a').replace(/[û,ü,ù]/g, 'u').replace(/[ô,ö]/g, 'o').replace(/[œ]/g, 'oe').replace(/[ç]/g, 'c').replace(/(.)\1+/g, '$1')


      this.obscenities.forEach(element => {
        
        //S'il y a un élément du tableau obscenities dans le nom, on l'affiche censuré
        if(newName.indexOf(element) > -1) {
          newName = newName.replace(element, '**')
          
          displayName = newName
        }

      })

      return displayName
      
    }
  },

  mounted: function () {
    if(this.$store.state.settings.useAlternateForms) this.useAlternateForms = 1
    if(this.$store.state.settings.useHints) this.useHints = 1
    if (!this.$store.state.settings.hasBeenPlayed) {
      this.scoreToAdd = false
      this.getScore();
    }
  },
};
</script>