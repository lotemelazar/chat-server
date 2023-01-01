
import { Router, Request, Response } from 'express';
import express from 'express';
import { Message } from "./types/message";
import { User } from "./types/user";

import { mockMessages } from "./assets/mockMessages";
import { mockUserDetails } from "./assets/mockUserDetails";
import cors from 'cors';


const port = 3001;
// const messages = Router();
const app = express();
app.use(cors());


function includeAuthorName() {
    const messagesWithAuthorName = mockMessages.map(message => {
        const userDetails = mockUserDetails.find(user => user.id === message.authorId);
        const authorName = userDetails && userDetails.name;
        return { ...message, authorName }
    });
    return messagesWithAuthorName;

}

app.get('/mockMessages', (req: Request, res: Response) => {
    res.send(includeAuthorName());
});

app.get('/mockUserDetails', (req: Request, res: Response) => {
    const namesAndIdList = mockUserDetails.map(user => ({ name: user.name, id: user.id }));
    res.send(namesAndIdList);
});



app.get("/users", (req: Request, res: Response) => {
    const userId = Number(req.query.id);
    if (userId) {
        const user: User | undefined = mockUserDetails.find(
            (curUser) => curUser.id === userId
        );
        res.send(user);
    }
});


app.listen(port, '0.0.0.0', () => {
    console.log('Server is running on port ${port}');
});

