from django.contrib.auth import get_user_model
from django.test import TestCase

from boards.models import Board

from .models import Post


class PostTestCase(TestCase):
    def setUp(self):
        self.author = get_user_model().objects.create_user(username='tester',
                                                           email='tester@forum.com',
                                                           password='ilovetesting')
        self.board = Board.objects.create(name='testBoard',
                                          description='Where the best tests happen.')
        self.post = Post.objects.create(title='VueJS Isn\'t Great--It\'s Amazing!',
                                        author=self.author,
                                        content='VueJS is an amazing framework. Wow!',
                                        board=self.board)

    def test_slug(self):
        self.assertEqual(self.post.slug, 'vuejs-isnt-great-its-amazing')