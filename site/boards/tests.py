from django.test import TestCase
from .models import Board


class BoardTest(TestCase):
    def test_slugs(self):
        names = ['Birds & Bees', 'TheWatchtower',
                 'Cooking', 'We Love Cats!', 'The A As']
        slugs = ['birdsandbees', 'thewatchtower',
                 'cooking', 'welovecats', 'theaas']

        for name, slug in zip(names, slugs):
            board = Board(name=name,
                          description='test')
            board.full_clean()
            board.save()
            self.assertEquals(board.slug, slug,
                              msg=f'Expected "{name}" to be slugified to "{slug}" but got "{board.slug}"')
