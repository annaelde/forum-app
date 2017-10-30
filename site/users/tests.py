from django.core.exceptions import ValidationError
from django.test import TestCase

from .models import User


class UserTest(TestCase):
    def test_username_regex(self):
        failingUsernames = ['..test', '__test', '--test',
                            'mySuperLongUsernameThatShouldFail', 'tes']
        passingUsernames = ['.test', '-test', '_test']

        for name in failingUsernames:
            user = User(username=name,
                        password='testingpassword',
                        email='email@test.com')
            with self.assertRaises(ValidationError, msg=name):
                if user.full_clean():
                    user.save()
            count = User.objects.filter(username=name).count()
            self.assertEqual(count, 0, name)

        for name in passingUsernames:
            user = User(username=name,
                        password='testingpassword',
                        email='email@test.com')
            try:
                user.full_clean()
                user.save()
            except:
                self.fail(msg='Validation error for ' + name)
            count = User.objects.filter(username=name).count()
            self.assertEqual(count, 1, name)
