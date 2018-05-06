"""
Helper functions.
"""
from io import BytesIO
from os import path

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.template.defaultfilters import slugify

from PIL import Image


def crop_thumbnail(original: Image, target_width: float, target_height: float) -> Image:
    """
    Resizes and crops a thumbnail to the desired measurements
    """
    target_ratio = target_width / target_height
    original_ratio = original.width / original.height

    if target_ratio > original_ratio:
        scale = target_width / original.width
        crop_height = target_height / scale
        crop_width = original.width
        margin = (original.height - crop_height) / 2
        original = original.crop(roundTuple(
            0, margin, crop_width, margin + crop_height,))
    elif target_ratio < original_ratio:
        scale = target_height / original.height
        crop_height = original.height
        crop_width = target_width / scale
        margin = (original.width - crop_width) / 2
        original = original.crop(roundTuple(
            margin, 0, margin + crop_width, crop_height,))

    return original.resize((target_width, target_height,), Image.ANTIALIAS)


def create_thumbnail(instance: object, height: float, width: float):
    """
    Creates a thumbnail based on the height and width.
    """
    # Read original file into memory
    original_file = BytesIO(instance.media_file.file.read())
    # Open file as image
    image = Image.open(original_file)
    # Crop the image
    image_format = image.format
    image = crop_thumbnail(image, width, height)
    # Create a new file stream for the new file
    new_file = BytesIO()
    # Save the cropped file to the new stream
    image.save(new_file, image_format, quality=100)
    # Seek to beginning of the stream
    new_file.seek(0)
    # Close the buffers
    original_file.close()
    new_file.close()
    image.close()
