from enum import Enum


class UserRole(str, Enum):
    USER = "USER"
    ADMIN = "ADMIN"


class Gender(str, Enum):
    MEN = "MEN"
    WOMEN = "WOMEN"
    UNISEX = "UNISEX"


class GenerationStatus(str, Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

