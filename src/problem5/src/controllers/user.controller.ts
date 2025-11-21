import express, { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import {
  validateId,
  validateQueryParams,
  validateUserCreate,
  validateUserUpdate,
} from "../validations/user.validation";
import { CommonReponse } from "../responses/common.response";
import { AppError } from "../middleware/error.middleware";

export class UserController {
  private static instance: UserController;
  private router: Router;
  private userService: UserService;

  private constructor() {
    this.router = express.Router();
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post("/", this.createUser.bind(this));
    this.router.get("/", this.getList.bind(this));
    this.router.get("/:id", this.getUserById.bind(this));
    this.router.put("/:id", this.updateUserById.bind(this));
    this.router.delete("/:id", this.deleteUserById.bind(this));
  }

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  public getRouter(): Router {
    return this.router;
  }

  private async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validation = validateUserCreate(req.body);
      if (!validation.valid) {
        throw new AppError("Validation failed", 400, validation.errors);
      }

      const user = await this.userService.createUser({
        name: req.body.name,
        description: req.body.description,
      });

      res.status(201).json(CommonReponse.of(user, true, "User created successfully"));
    } catch (error) {
      next(error);
    }
  }

  private async getList(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validation = validateQueryParams(req.query);
      if (!validation.valid) {
        throw new AppError("Validation failed", 400, validation.errors);
      }

      const users = await this.userService.getUsers({
        q: validation.q,
        limit: validation.limit,
        offset: validation.offset,
      });

      res.json(CommonReponse.of(users, true));
    } catch (error) {
      next(error);
    }
  }

  private async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idValidation = validateId(req.params.id);
      if (!idValidation.valid) {
        throw new AppError("Validation failed", 400, idValidation.error);
      }

      const user = await this.userService.getUserById(idValidation.value!);
      res.json(CommonReponse.of(user, true));
    } catch (error) {
      next(error);
    }
  }

  private async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idValidation = validateId(req.params.id);
      if (!idValidation.valid) {
        throw new AppError("Validation failed", 400, idValidation.error);
      }

      const validation = validateUserUpdate(req.body);
      if (!validation.valid) {
        throw new AppError("Validation failed", 400, validation.errors);
      }

      const user = await this.userService.updateUser(idValidation.value!, {
        name: req.body.name,
        description: req.body.description,
      });

      res.json(CommonReponse.of(user, true, "User updated successfully"));
    } catch (error) {
      next(error);
    }
  }

  private async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idValidation = validateId(req.params.id);
      if (!idValidation.valid) {
        throw new AppError("Validation failed", 400, idValidation.error);
      }

      await this.userService.deleteUser(idValidation.value!);
      res.status(200).json(CommonReponse.of(null, true, "User deleted successfully"));
    } catch (error) {
      next(error);
    }
  }
}
