class ThreadDTO {
    constructor({ id, username, avatar, content, timestamp, likeCount, dislikeCount, replies }) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.content = content;
        this.timestamp = timestamp;
        this.likeCount = likeCount || 0;
        this.dislikeCount = dislikeCount || 0;
        this.replies = replies || [];
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            avatar: this.avatar,
            content: this.content,
            timestamp: this.timestamp,
            likeCount: this.likeCount,
            dislikeCount: this.dislikeCount,
            replies: this.replies
        };
    }

    static fromJSON(json) {
        return new ThreadDTO(json);
    }
}

export default ThreadDTO;