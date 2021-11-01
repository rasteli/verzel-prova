import { Router } from "express"

//** User */
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { LoginUserController } from "./controllers/LoginUserController"
import { SignUpUserController } from "./controllers/SignUpUserController"
import { UserProfileController } from "./controllers/UserProfileController"
import { ResetPasswordController } from "./controllers/ResetPasswordController"
import { SendResetEmailController } from "./controllers/SendResetEmailController"

//** Module */
import { GetModulesController } from "./controllers/GetModulesController"
import { CreateModuleController } from "./controllers/CreateModuleController"
import { UpdateModuleController } from "./controllers/UpdateModuleController"
import { DeleteModuleController } from "./controllers/DeleteModuleController"

//** Class */
import { CreateClassController } from "./controllers/CreateClassController"
import { UpdateClassController } from "./controllers/UpdateClassController"
import { DeleteClassController } from "./controllers/DeleteClassController"

const routes = Router()

//** User */
routes.post("/login", new LoginUserController().handle)
routes.post("/signup", new SignUpUserController().handle)
routes.post("/send-reset", new SendResetEmailController().handle)
routes.post("/reset-password", new ResetPasswordController().handle)
routes.get("/profile", ensureAuthenticated, new UserProfileController().handle)

//** Module */
routes.get("/modules", new GetModulesController().handle)
routes.put("/module", ensureAuthenticated, new UpdateModuleController().handle)
routes.post("/module", ensureAuthenticated, new CreateModuleController().handle)

routes.delete(
  "/module/:module_id",
  ensureAuthenticated,
  new DeleteModuleController().handle
)

//** Class */
routes.put("/class", ensureAuthenticated, new UpdateClassController().handle)
routes.post("/class", ensureAuthenticated, new CreateClassController().handle)

routes.delete(
  "/class/:class_id",
  ensureAuthenticated,
  new DeleteClassController().handle
)

export { routes }
