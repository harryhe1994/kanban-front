import httpHelper from '../common/util/HttpHelper'
// import axios from "axios/index";
let host = '';

const deleteCardById = async (id) => {
    console.log('delete', id);
    var result = await httpHelper.del(`${host}/api/card/` + id, id);
    return result.data;
};

const updateCard = async (card) => {
    var result = await httpHelper.put(`${host}/api/card`, card);
    console.log(result);
    return result.data;
};

const addCard = async (card, cardList) => {
    var result = await httpHelper.post(`${host}/api/card`, card);
    if(result.data && result.data.length > 0){
        var newCard = result.data[0];
        cardList.forEach(function (card) {
            if(card.order === newCard.order){
                card._id = newCard._id;
                card.__v = newCard.__v;
            }
        });
    }
    return result.data;
};

const findAll = async () => {
    var result = await httpHelper.get(`${host}/api/card/cards`);
    return result.data;
};

const findCardByTime = async () => {
    var result = await httpHelper.get(`${host}/api/card/time`);
    return result.data;
};

export default {
    deleteCardById,
    updateCard,
    addCard,
    findAll,
    findCardByTime
}
