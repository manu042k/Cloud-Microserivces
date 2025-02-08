from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
import jwt
import os
from starlette.responses import JSONResponse

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            auth_header = request.headers.get("Authorization")
            
            if not auth_header or not auth_header.startswith("Bearer "):
                raise HTTPException(status_code=401, detail="Unauthorized: Missing or invalid token format")

            token = auth_header.split(" ")[1]
            try:
                if token:
                    pass
                # payload = jwt.decode(token, os.getenv("JWT_SECRET", "your_secret"), algorithms=["HS256"])
                # request.state.user = payload  # Attach user data to request state
            except jwt.ExpiredSignatureError:
                raise HTTPException(status_code=401, detail="Token has expired")
            except jwt.InvalidTokenError:
                raise HTTPException(status_code=401, detail="Invalid token")

            return await call_next(request)

        except HTTPException as e:
            return JSONResponse(status_code=e.status_code, content={"detail": e.detail})

        except Exception as e:
            return JSONResponse(status_code=400, content={"detail": "Bad request"})
