from datetime import datetime, timezone

from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from src.config import settings

ALGORITHM = "HS256"
security = HTTPBearer()


def decode_jwt(token: str) -> dict:
    """Decode a JWT token and verify its expiration."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[ALGORITHM])
        exp = payload.get("exp")

        # Verify that the token has not expired
        if exp and datetime.fromtimestamp(exp, tz=timezone.utc) < datetime.now(
            tz=timezone.utc
        ):
            return None

        return payload
    except JWTError:
        return None


def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """Verify the incoming token using the `decode_jwt` function."""
    token = credentials.credentials
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # Decode the JWT token
    payload = decode_jwt(token)
    if not payload or "sub" not in payload:
        raise credentials_exception

    # Return the user's subject or identifier for further checks
    return payload["sub"]
