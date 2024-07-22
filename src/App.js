import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendsArr, setFriendsArr] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = function () {
    setShowAddFriend((s) => !s);
    setSelectedFriend(null);
  };

  const handleSetFriends = function (friendObj) {
    setFriendsArr((fArr) => [...fArr, friendObj]);
    setShowAddFriend(false);
  };

  const handleSelectFriend = function (friendObj) {
    setSelectedFriend(friendObj);
    setShowAddFriend(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsList={friendsArr}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onSetFriends={handleSetFriends} />}
        <Button clickHandler={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friendsList, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friendsList.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          isSelected={selectedFriend?.id === friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, isSelected }) {
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={`a person named ${friend.name}`} />
      <h3>{friend.name}</h3>

      {friend.balance > 0 && (
        <p className="green">{`you owe ${friend.name} $${Math.abs(
          friend.balance
        )}`}</p>
      )}

      {friend.balance < 0 && (
        <p className="red">{`${friend.name} owes you $${Math.abs(
          friend.balance
        )}`}</p>
      )}

      {friend.balance === 0 && <p>{`you and ${friend.name} are even`}</p>}

      <Button
        clickHandler={(e) => {
          e.preventDefault();

          if (isSelected) {
            onSelectFriend(null);
          } else {
            onSelectFriend(friend);
          }
        }}
      >
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onSetFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => {
        e.preventDefault();

        if (!name || !image) return;

        const generatedID = crypto.randomUUID();
        const friendObj = {
          id: generatedID,
          balance: 0,
          name,
          image: `${image}?u=${generatedID}`,
        };

        onSetFriends(friendObj);
      }}
    >
      <label>👫 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend?.name}</h2>

      <label>💸 Bill value</label>
      <input type="text" />

      <label>🧍Your expense</label>
      <input type="text" />

      <label>👫 {selectedFriend?.name}'s expense</label>
      <input type="text" disabled />

      <label>🤑 Who's paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>
    </form>
  );
}

function Button({ clickHandler, children }) {
  return (
    <button className="button" onClick={clickHandler}>
      {children}
    </button>
  );
}

export default App;
