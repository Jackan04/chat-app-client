export function getRecipient(participants, currentUser) {
  const recipient = participants.find(
    (participant) => participant.id !== currentUser.id,
  );

  return recipient;
}
