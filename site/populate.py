import os
from django.core.wsgi import get_wsgi_application
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "forum.settings")
application = get_wsgi_application()

from boards.models import Board
from users.models import User
from threads.models import Post

if __name__ == '__main__':
    boards = (('Computers', 'Read about computers.'),
              ('Flowers', 'Pictures about flowers and advice.'),
              ('Cooking', 'Recipes and discussion of dishes.'),
              ('Movies', 'All the newest movies.'),
              ('Television', 'Discussion about shows.'),
              ('News', 'The latest news.'))

    threads = ('First post!',
               'Here\'s something new',
               'Read this before posting',
               'This is really interesting',
               'What do you think?',
               'Thread for memes')

    user = User.objects.create(username='testgirl',
                               password='defaultpassword',
                               email='email@test.com')

    content = f'Lorem ipsum dolor sit amet, viderer alterum ad per. Ut his simul vocibus albucius. Ius quando tantas an, no ullum putent volutpat ius, augue audire eum ea. Ea his zril mediocrem theophrastus.\nEum no numquam dissentiet, ea clita assentior mel. Invidunt necessitatibus at mel. Stet debitis pro in. An usu liber ignota, et sit partem liberavisse. Nam harum salutatus in. Id has quem vivendo omnesque. Has movet congue pertinacia eu, vix facer vocibus at. At mei epicurei insolens facilisis. Porro platonem nam at.\nPro nominati scripserit in, an amet epicurei mnesarchum per. Essent lucilius usu et. Eu est purto ignota persequeris. Erat delectus adversarium nam te, vim esse maiorum sensibus ne. Te ornatus evertitur sed. Eam ex alii apeirian verterem, ius eu tation graeco, ei eius impetus consequuntur qui.\nPer volutpat prodesset ad, vix eu quem consul reprimique, soluta omnesque disputando nec ex. Pro ei semper ancillae placerat. Autem imperdiet mediocritatem id vis, populo cetero eu eum. Ad animal laoreet delicatissimi duo. Nam at ferri conclusionemque. Qui ex sanctus mentitum deseruisse, populo efficiantur instructior per id, eos et impedit convenire splendide.'

    for (title, description) in boards:
        board = Board.objects.create(name=title,
                                     description=description)
        for title in threads:
            Post.objects.create(title=title,
                                author=user,
                                content=content,
                                board=board)
