import { User } from "@/app/Models/user.model";
import { Db } from "@/db/connect";
export async function POST(req) {
  const body = await req.json();

  try {
    Db();

    const existingUser = await User.findOne({
      $or: [{ email: body.email }, { password: body.password }],
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          data: user,
          message: "User already exist",
        },
        {
          status: 402,
        }
      );
    }

    const user = await User.create(body);

    return Response.json(
      {
        success: true,
        data: user,
        message: "Success",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Fail",
      },
      {
        status: 400,
      }
    );
  }
}
