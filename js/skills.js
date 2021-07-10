"use strict";
$(function() {
    new Vue({
        el: "#app",
        data: {
            skillDatas: [],
            ranks: [{
                name: "NOOB",
                picUrl: "./img/skills-icone-tie-fighter-basic.svg",
                sentence: 'Welcome aboard ! My mission: <span class="highline">Collect resources and learn skills to improve the ship.</span><br>Good luck, captain !'
            }, {
                name: "BEGINNER",
                picUrl: "./img/skills-icones-tie-fighter-bomber.svg",
                sentence: '<b>Congrats !</b> I manage to become a <span class="highline">“Front-End Beginner”</span>. Keep looking for the resources to take it to the next level.'
            }, {
                name: "DEVELOPER",
                picUrl: "./img/skills-icones-tie-fighter-interceptor.svg",
                sentence: '<b>I am making good progress!!</b> Now I am a <span class="highline">“Front-End Developer”</span>. The upgrade program is almost complete. <br>Next Level: Front End Master'
            }, {
                name: "MASTER",
                picUrl: "./img/skills-icones-tie-fighter-advanced.svg",
                sentence: '<b>Excellent !</b> I became a<span class="highline">“Front-end Master”</span>. But a new galaxy has emerged in the system.<br>Captain, make your choice.'
            }],
            currentRank: 1,
            currentBranch: {}
        },
        methods: {
            /*Return true when the element in the checklist is completed
            0: false
            1: true
            */
            currentComplete: function(e) {
                return null == e ? 0 : e.filter(function(e) {
                    return 1 == e.complete
                }).length
            },
            //Make appear all the elements in the list to validate the skills
            focusList: function(e) {
                this.skillDatas.forEach(function(e) {
                    e.branch.forEach(function(e) {
                        e.active = !1
                    })
                }),
                e.active = !0,
                this.currentBranch = e
            },
            //Check if all elements in the checklist are completed
            toggleListComplete: function(e) {
                e.complete = !e.complete,
                this.checkBranchComplete()
            },
            //Check if all elements in the branch are completed
            checkBranchComplete: function() {
                if (null != this.currentBranch.recommend)
                    return this.currentBranch.recommendComplete = this.currentBranch.recommend.every(function(e) {
                        return 1 == e.complete
                    }),
                    this.currentBranch.recommendComplete && this.checkLevelComplete()
            },
            //check if all brach on levels are completed
            checkLevelComplete: function() {
                var n = 0;
                this.skillDatas.forEach(function(e) {
                    e.levelComplete = e.branch.every(function(e) {
                        return 1 == e.recommendComplete
                    }),
                    n = 1 == e.levelComplete ? ++n : n
                }),
                this.currentRank = 0 == n ? n : n - 1
            }
        },
        //Generate the skill tree with the actual data
        created: function() {
            var n = this;
            $.getJSON("../data/skilltree.json", function(e) {
                n.skillDatas = e,
                n.currentBranch = n.skillDatas[0].branch[0]
            })
        }
    })
});