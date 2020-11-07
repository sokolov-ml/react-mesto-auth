import React from 'react';

import api from './components/utils/Api';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithImage from './components/PopupWithImage';
import EditAvatarPopup from './components/EditAvatarPopup';
import EditProfilePopup from './components/EditProfilePopup';
import AddPlacePopup from './components/AddPlacePopup';
import RemoveCardPopup from './components/RemoveCardPopup';

import { CurrentUserContext } from './contexts/CurrentUserContext.js';

import './App.css';
import logo from './images/header__logo.svg';
import imgAvatar from './images/profile__photo.png';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = React.useState(false);
  const [isViewCardPopupOpen, setIsViewCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: imgAvatar });
  // const currentUser = React.createContext();

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    // setInterval(getCards, 10000);
    getCards();
  }, []);

  function getCards() {
    api
      .getCards()
      .then((result) => {
        setCards(result);
      })
      .catch(() => {
        console.error('can`t get userInfo');
      });
  }

  React.useEffect(() => {
    api
      .getCurrentUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch(() => {
        console.error('can`t get userInfo');
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRemoveCardPopupOpen(false);
    setIsViewCardPopupOpen(false);
    setSelectedCard();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsViewCardPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      return api
        .setLikeCardOff(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch(() => {
          console.error('can`t unset like');
        });
    } else {
      return api
        .setLikeCardOn(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch(() => {
          console.error('can`t set like');
        });
    }
  }

  function handleCardRemove(card) {
    setSelectedCard(card);
    setIsRemoveCardPopupOpen(true);
  }

  function handleOnDeleteCard(func) {
    func(true);
    api
      .removeCard(selectedCard._id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(() => {
        console.error('can`t delete cards');
      })
      .finally(() => {
        func(false);
      });
  }

  function handleUpdateUser(obj, func) {
    func(true);
    api
      .updateCurrentUserInfo(obj.name, obj.about)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch(() => {
        console.error('can`t update userinfo');
      })
      .finally(() => {
        func(false);
      });
  }

  function handleUpdateAvatar(obj, func) {
    func(true);
    api
      .updateCurrentUserPhoto(obj.avatar)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch(() => {
        console.error('can`t update user avatar');
      })
      .finally(() => {
        func(false);
      });
  }

  function handleAddPlaceSubmit(obj, func) {
    func(true);
    api
      .addNewCard(obj.name, obj.link)
      .then((response) => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch(() => {
        console.error('can`t add card');
      })
      .finally(() => {
        func(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='content'>
        <Header logo={logo} />

        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardRemove={handleCardRemove}
        >
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            key={Math.random()}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <RemoveCardPopup
            card={selectedCard}
            isOpen={isRemoveCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleOnDeleteCard}
          />

          <PopupWithImage card={selectedCard} isOpen={isViewCardPopupOpen} onClose={closeAllPopups}></PopupWithImage>
        </Main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
