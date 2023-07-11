import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { conversationValidationSchema } from 'validationSchema/conversations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getConversations();
    case 'POST':
      return createConversation();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getConversations() {
    const data = await prisma.conversation
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'conversation'));
    return res.status(200).json(data);
  }

  async function createConversation() {
    await conversationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.recording?.length > 0) {
      const create_recording = body.recording;
      body.recording = {
        create: create_recording,
      };
    } else {
      delete body.recording;
    }
    const data = await prisma.conversation.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
