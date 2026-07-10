import time
from collections.abc import Awaitable, Callable

from fastapi import Request, Response
from loguru import logger


async def request_logging_middleware(
    request: Request,
    call_next: Callable[[Request], Awaitable[Response]],
) -> Response:
    start_time = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start_time) * 1000

    logger.info(
        "{method} {path} -> {status_code} in {duration:.2f}ms",
        method=request.method,
        path=request.url.path,
        status_code=response.status_code,
        duration=duration_ms,
    )

    response.headers["X-Process-Time-ms"] = f"{duration_ms:.2f}"
    return response

