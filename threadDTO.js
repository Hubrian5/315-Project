// DTO structure
const threadDTO = {
    postId: "12345",
    username: "John Balatro",
    avatarUrl: "John.webp",
    postContent: "Hey, I was having problem with my loops in C and was wondering if anyone could take a look at what I'm doing wrong.",
    timestamp: "01/29/2025",
    likes: 0,
    dislikes: 0,
    replies: [
        {
            replyId: "67890",
            replyUsername: "JaneDoe",
            replyAvatarUrl: "Jane.jpg",
            replyContent: "You should post the code so we can take a look.",
            replyTimestamp: "01/29/2025",
            replyLikes: 1,
            replyDislikes: 0
        }
    ],
    editHistory: [
        {
            editTimestamp: "01/29/2025",
            previousContent: "Hey, I was having problem with my loops in C."
        }
    ],
    userRole: "regular",
    tags: ["C", "loops", "programming"],
    attachments: [],
    quoteReferences: [],
    visibility: "public"
};

// Function to send the DTO data to the HTML page
function sendDTOToHTML() {
    // Update the post content
    document.querySelector('.post-content p').textContent = threadDTO.postContent;

    // Update the username
    document.querySelector('.post-username').textContent = threadDTO.username;

    // Update the avatar
    document.querySelector('.avatar').src = threadDTO.avatarUrl;

    // Update the timestamp
    document.querySelector('.timestamp').textContent = `Posted on ${threadDTO.timestamp}`;

    // Update likes and dislikes
    document.querySelector('.like-count').textContent = threadDTO.likes;
    document.querySelector('.dislike-count').textContent = threadDTO.dislikes;

    // Update replies (if any)
    const replySection = document.querySelector('.reply-section');
    threadDTO.replies.forEach(reply => {
        const replyElement = document.createElement('div');
        replyElement.className = 'post';
        replyElement.innerHTML = `
            <div class="post-sidebar">
                <img src="${reply.replyAvatarUrl}" alt="${reply.replyUsername}" class="avatar">
                <div class="post-username">${reply.replyUsername}</div>
            </div>
            <div class="post-content">
                <div class="post-header"><span class="timestamp">Posted on ${reply.replyTimestamp}</span></div>
                <p>${reply.replyContent}</p>
                <div class="post-actions">
                    <button class="like-button">👍 Like <span class="like-count">${reply.replyLikes}</span></button>
                    <button class="dislike-button">👎 Dislike <span class="dislike-count">${reply.replyDislikes}</span></button>
                </div>
            </div>
        `;
        replySection.insertBefore(replyElement, replySection.firstChild);
    });
}

// Call the function to send DTO data to the HTML page
sendDTOToHTML();
