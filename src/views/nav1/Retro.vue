<template>
    <section>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="card-well card-bar-common">
                    <el-tag class="card-tag">Well</el-tag>
                </div>
                <el-row class="card-main-well card-main-common">
                    <div id="wellListDraggable">
                        <draggable v-model="wellList" :options="dragOptions" @change="moveCardToWellDistrictEvt">
                            <transition-group class="drag-common" tag="ul">
                                <li class="list-group-item" v-for="element in wellList" :key="element.order">
                                    <div class="card-style">
                                        <div style="text-align: center; height: 65px; padding-top: 23px">
                                            <textarea type="text" v-show="element.isEditCard" :id='element.order'
                                                      :value="element.comment" style="min-width: 86%; height: 60px"
                                                      v-on:blur="editCardDone(element, wellList)"></textarea>
                                            <span v-show="!element.isEditCard" v-on:click="editCard(element)"
                                                  style="cursor: pointer;">{{element.comment}}</span>
                                        </div>
                                        <div>
                                            <i class="el-icon-delete"
                                               style="float: right; padding-right: 5px; cursor: pointer; font-size: 18px"
                                               v-on:click="deleteCard(element, wellList, 'well')"></i>
                                        </div>
                                    </div>
                                </li>
                            </transition-group>
                        </draggable>
                    </div>
                </el-row>
            </el-col>
            <el-col :span="8">
                <div class="card-not-well card-bar-common">
                    <el-tag class="card-tag">Not Well
                    </el-tag>
                </div>
                <el-row class="card-main-not-well card-main-common">
                    <div id="notWellListDraggable">
                        <draggable v-model="notWellList" :options="dragOptions" @change="moveCardToNotWellDistrictEvt">
                            <transition-group class="drag-common" tag="ul">
                                <li class="list-group-item" v-for="element in notWellList" :key="element.order">
                                    <div class="card-style">
                                        <div style="text-align: center; height: 65px; padding-top: 23px">
                                            <textarea type="text" v-show="element.isEditCard" :id='element.order'
                                                      :value="element.comment" style="min-width: 86%; height: 60px"
                                                      v-on:blur="editCardDone(element, notWellList)"></textarea>
                                            <span v-show="!element.isEditCard" v-on:click="editCard(element)"
                                                  style="cursor: pointer;">{{element.comment}}</span>
                                        </div>
                                        <div>
                                            <i class="el-icon-delete"
                                               style="float: right; padding-right: 5px; cursor: pointer; font-size: 18px"
                                               v-on:click="deleteCard(element, notWellList, 'notWell')"></i>
                                        </div>
                                    </div>
                                </li>
                            </transition-group>
                        </draggable>
                    </div>
                </el-row>
            </el-col>
            <el-col :span="8">
                <div class="card-suggestion card-bar-common">
                    <el-tag class="card-tag">Suggestion</el-tag>
                </div>
                <el-row class="card-main-suggestion card-main-common">
                    <div id="suggestionListDraggable">
                        <draggable v-model="suggestionList" :options="dragOptions" @change="moveCardToSuggestionDistrictEvt">
                            <transition-group class="drag-common" tag="ul">
                                <li class="list-group-item" v-for="element in suggestionList" :key="element.order">
                                    <div class="card-style">
                                        <div style="text-align: center; height: 65px; padding-top: 23px">
                                            <textarea type="text" v-show="element.isEditCard" :id='element.order'
                                                      :value="element.comment" style="min-width: 86%; height: 60px"
                                                      v-on:blur="editCardDone(element, suggestionList)"></textarea>
                                            <span v-show="!element.isEditCard" v-on:click="editCard(element)"
                                                  style="cursor: pointer;">{{element.comment}}</span>
                                        </div>
                                        <div>
                                            <i class="el-icon-delete"
                                               style="float: right; padding-right: 5px; cursor: pointer; font-size: 18px"
                                               v-on:click="deleteCard(element, suggestionList, 'suggestion')"></i>
                                        </div>
                                    </div>
                                </li>
                            </transition-group>
                        </draggable>
                    </div>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col style="text-align: center; margin-top: 13px">
                <el-button type="primary" style="width: 120px; height: 50px; font-size: 32px;" v-on:click="addCard">
                    Add
                </el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
            <el-col class="card-edit">
                <div  id="editListDraggable">
                    <draggable v-model="editCardList" :options="dragOptions" @change="moveCardToEditDistrictEvt">
                        <transition-group class="drag-edit" tag="ul">
                            <div class="list-group-item" v-for="element in editCardList" :key="element.order"
                                 style="float: left; margin-left: 40px">
                                <div class="edit-card-style">
                                    <div style="text-align: center; height: 65px; padding-top: 23px">
                                        <textarea type="text" v-show="element.isEditCard" :id='element.order'
                                                  :value="element.comment" style="min-width: 86%; height: 60px"
                                                  v-on:blur="editCardDone(element, editCardList)"></textarea>
                                        <span v-show="!element.isEditCard" v-on:click="editCard(element)"
                                              style="cursor: pointer;">{{element.comment}}</span>
                                    </div>
                                    <div>
                                        <i class="el-icon-delete"
                                           style="float: right; padding-right: 5px; cursor: pointer; font-size: 18px"
                                           v-on:click="deleteCard(element, editCardList, 'edit')"></i>
                                    </div>
                                </div>
                            </div>
                        </transition-group>
                    </draggable>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import draggable from 'vuedraggable'
    import randomOrderUtil from '../../common/util/RandomOrderUtil'
    import cardService from '../../service/CardService'
    import io from 'socket.io-client'

    export default {
        components: {
            draggable,
        },
        data() {
            return {
                isEditCard: false,
                editCardList: [],
                wellList: [],
                notWellList: [],
                suggestionList: []
            }
        },
        methods: {
            moveCardToEditDistrictEvt (operaiton) {
                if(!!operaiton.added){
                    this.updateCardType(this.editCardList, 0);
                    cardService.deleteCardById(operaiton.added.element._id);
                }
            },
            async moveCardToWellDistrictEvt (operaiton) {
                if(!!operaiton.added){
                    var movedCard = operaiton.added.element;
                    var oldType = movedCard.type;
                    movedCard.type = 1;
                    if(oldType == 0){
                        cardService.addCard(movedCard, this.wellList);
                    } else {
                        cardService.updateCard(movedCard);
                    }
                    this.updateCardType(this.wellList, 1);
                }
            },
            async moveCardToNotWellDistrictEvt (operaiton) {
                if(!!operaiton.added){
                    var movedCard = operaiton.added.element;
                    var oldType = movedCard.type;
                    movedCard.type = 2;
                    if(oldType == 0){
                        var result = await cardService.addCard(movedCard, this.notWellList);
                        if(!!result && result.length > 0) {
                            this.socket.emit('cardChange', {message: 'cardChange'});
                        }
                    } else {
                        await cardService.updateCard(movedCard);
                    }
                    this.updateCardType(this.notWellList, 2);
                }
            },
            moveCardToSuggestionDistrictEvt (operaiton) {
                if(!!operaiton.added){
                    var movedCard = operaiton.added.element;
                    var oldType = movedCard.type;
                    movedCard.type = 3;
                    if(oldType == 0){
                        cardService.addCard(movedCard, this.suggestionList);
                    } else {
                        cardService.updateCard(movedCard);
                    }
                    this.updateCardType(this.suggestionList, 3);
                }
            },
            updateCardType (cardList, type) {
                cardList.forEach(function (card) {
                    if(card.type !== type ) {
                        card.type = type;
                    }
                });
            },
            editCardDone(element, cardList) {
                var text = document.getElementById(element.order).value;
                if(!!text){
                    element.isEditCard = false;
                    cardList.forEach(function (item) {
                        if (item.order === element.order) {
                            item.comment = text;
                        }
                    });
                    cardService.updateCard(element);
                }
            },
            editCard(element) {
                element.isEditCard = true;
                document.getElementById(element.order);
            },
            addCard() {
                this.editCardList.push({
                    comment: "",
                    type: 0,
                    order: randomOrderUtil.randomOrder().toString(),
                    isEditCard: true
                });
            },
            deleteCard(element, cardList, flag) {
                if ('edit' === flag) {
                    this.editCardList = cardList.filter(function (item) {
                        return item.order != element.order;
                    });
                } else if ('notWell' === flag) {
                    this.notWellList = cardList.filter(function (item) {
                        return item.order != element.order;
                    });
                } else if ('suggestion' === flag) {
                    this.suggestionList = cardList.filter(function (item) {
                        return item.order != element.order;
                    });
                } else if ('well' === flag) {
                    this.wellList = cardList.filter(function (item) {
                        return item.order != element.order;
                    });
                }
                if('edit' !== flag) {
                    cardService.deleteCardById(element._id);
                }
            },
            async loadAllCardData () {
                this.wellList = [];
                this.notWellList = [];
                this.suggestionList = [];
                var cards = await cardService.findCardByTime();
                var $this = this;
                cards.forEach(function (card) {
                    if(card.type == 1) {
                        $this.wellList.push(card);
                    } else if(card.type === 2) {
                        $this.notWellList.push(card);
                    } else {
                        $this.suggestionList.push(card);
                    }
                });
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: 'description',
                    disabled: false,
                    ghostClass: 'ghost'
                };
            },
            wellListJson() {
                return JSON.stringify(this.wellList);
            },
            notWellListJson() {
                return JSON.stringify(this.notWellList);
            },
        },
        mounted () {
            this.loadAllCardData();

            var $this = this;
            var socketConfig = {
                path: '/api/socketio'
            };
            this.socket = io.connect('heha4-w10-2.corp.oocl.com:8686', socketConfig);
            this.socket.on('cardChange', function (data) {
                console.log('msg', data.message);
                if('cardLoad' === data.message) {
                    console.log('need load data', data.message);
                    // $this.loadAllCardData();
                }
            });
            // socket.emit('cardChange', {msg:'hello server'})；
        }
    }

</script>

<style lang="scss" scoped>
    .card-well {
        background: #99ff66;
    }

    .card-not-well {
        background: #ff9999;
    }

    .card-suggestion {
        background: #33ffff;
    }

    .card-bar-common {
        border-radius: 7px;
        min-height: 36px;
        text-align: center;
    }

    .card-main-well {
        border: 1px solid #99ff66;
    }

    .card-main-not-well {
        border: 1px solid #ff9999;
    }

    .card-main-suggestion {
        border: 1px solid #33ffff;
    }

    .card-main-common {
        border-radius: 7px;
        height: 550px;
        overflow: auto
    }

    .card-edit {
        border: 3px solid #928c83;
        border-radius: 7px;
        height: 150px;
        overflow: auto
    }

    .card-tag {
        font-size: 22px;
        background: none;
        color: black;
        margin-top: 5px
    }

    .card-style {
        border-radius: 7px;
        height: 110px;
        min-width: 80%;
        background: #f2e8b2;
        margin-bottom: -20px;
        margin-left: -30px;
        margin-right: 10px;

    }

    .edit-card-style {
        border-radius: 7px;
        height: 110px;
        width: 460px;
        background: #f2e8b2;
        margin-bottom: -20px;
        margin-left: -30px;
        margin-right: 10px;
    }

    .drag-common {
        height: 520px;
    }
    .drag-edit {
        height: 115px;
    }

    .list-group-item {
        cursor: move;
        list-style-type: none;
        border: 0;
        height: 130px;
    }
</style>