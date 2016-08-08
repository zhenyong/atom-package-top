import cherrio from 'cheerio'

export default function parse(content) {
  const $ = cherrio.load(content)

  const cells = $('.package-list .grid-cell')
  const data = cells.map((i, cell) => {
    // --- body
    const $card = $(cell).children('.card').first()
    const $cardNameA = $card.find('>.body>.card-name a')

    // --- meta
    const $meta = $card.find('>.meta')
    const $metaAvatarA = $meta.find('>a').first()
    const $metaUserA = $meta.find('a.author')

    const $metaRight = $meta.find('>.meta-right')
    const $downloadVal = $metaRight.find('.stat>.value')
    const $startCount = $metaRight.find('.star-box .social-count')

    const keys = $card.find('.keywords>li>a').map((j, a) => {
      const $a = $(a)
      return {
        name: $a.text().trim().replace(/^#/, ''),
        href: $a.attr('href'),
      }
    }).get()

    return {
      name: $cardNameA.text().trim(),
      href: $cardNameA.attr('href'),
      description: $card.find('.card-description').text().trim(),
      keys,
      author: {
        avatar: $metaAvatarA.children('img').first().attr('src'),
        name: $metaUserA.text().trim(),
        href: $metaUserA.attr('href'),
      },
      downloadCount: $downloadVal.text().trim(),
      starCount: $startCount.text().trim(),
    }
  }).get()

  return data
}
